const {ROLE_ADMIN, ROLE_DEVELOPER, ROLE_MANAGER} = require("../constants/constans");
const UserRepository = require("../repositories/UserRepository");
const TogglService = require("../services/TogglService");
const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");
const {response} = require("express");

dayjs.extend(duration);

const getDevelopers = async (req, res) => {
    let authUser = req.user;

    let start_date = req.query.start_date + 'T00:00:00.52Z';
    let end_date = req.query.end_date + 'T23:59:59.52Z';

    let users;
    if (authUser.role === ROLE_ADMIN) {
        users = await UserRepository.getByRole(ROLE_DEVELOPER);
    } else {
        users = await UserRepository.getByParentIdAndRole(authUser.id, ROLE_DEVELOPER);
    }

    let toggleService = new TogglService();

    let response = [];
    for (let user of users) {
        let status = false;
        let time = 0;
        let action = false;

        let toggleUser = null;
        if (user.toggl_api_key) {
            let currentEntry = await toggleService.getCurrentEntry(user.toggl_api_key);
            if (currentEntry === null) {
                status = 0;
            } else if (Object.keys(currentEntry).length > 0) {
                status = 1;
                action = true;
            }

            if (status !== false) {
                let entries = await toggleService.getEntries(user.toggl_api_key, start_date, end_date);
                entries.forEach((entry) => {
                    if (entry.stop) {
                        time += entry.duration;
                    }
                });
            }
        }

        response.push({
            id: user._id,
            name: user.name,
            status: status,
            time: formatTime(time),
            action: action,
        });
    }

    res.json(response);
}

const getManagers = async (req, res) => {
    let authUser = req.user;

    let users = await UserRepository.getByRole(ROLE_MANAGER);

    let response = [];
    for (let user of users) {
        let countDevelopers = await UserRepository.getByParentIdAndRole(user._id, ROLE_DEVELOPER);

        response.push({
            id: user._id,
            name: user.name,
            count: countDevelopers.length
        });
    }

    res.json(response);
}

const stopTracker = async (req, res) => {
    try {
        let userId = req.params.userId;

        let user = {};
        try {
            user = await UserRepository.getById(userId);
        } catch (error) {
            throw "User not found";
        }

        let toggleService = new TogglService();

        let currentEntry = await toggleService.getCurrentEntry(user.toggl_api_key);
        if (!currentEntry) {
            throw "Tracker not ON";
        }

        let response = await toggleService.stopEntry(user.toggl_api_key, currentEntry.workspace_id, currentEntry.id);
        if (response === false) {
            throw "Tracker not stopped";
        }

        res.json({success: true});
    } catch (error) {
        res.status(500).send(error);
    }
}

const getEntries = async (req, res) => {
    try {
        let userId = req.params.userId;

        let startDate = req.query.startDate + 'T00:00:00.52Z';
        let endDate = req.query.endDate + 'T23:59:59.52Z';

        let user = {};
        try {
            user = await UserRepository.getById(userId);
        } catch (error) {
            throw "User not found";
        }

        let toggleService = new TogglService();

        let entries = await toggleService.getEntries(user.toggl_api_key, startDate, endDate);

        let totalDuration = 0;
        let items = {}

        entries.forEach((entry) => {
            let entryDate = dayjs(entry.start).format('ddd, DD MMM');

            let item = {
                id: entry.id,
                title: entry.description,
                tags: entry.tags,
                duration: (entry.stop) ? entry.duration : 0,
                startUnix: dayjs(dayjs(entry.start).format('YYYY-MM-DD HH:mm')).unix(),
                stopUnix: (entry.stop) ? dayjs(dayjs(entry.stop).format('YYYY-MM-DD HH:mm')).unix() : false,
                start: dayjs(entry.start).format('HH:mm:ss'),
                stop: (entry.stop) ? dayjs(entry.stop).format('HH:mm:ss') : false,
                durationFormatted: dayjs.duration((entry.stop ? entry.duration : 0) * 1000).format('HH:mm'),
                startFormatted: dayjs(entry.start).format('HH:mm'),
                stopFormatted: (entry.stop) ? dayjs(entry.stop).format('HH:mm') : false,
            };

            if (items[entryDate] === undefined) {
                items[entryDate] = [item];
            } else {
                items[entryDate].push(item);
            }

            totalDuration += (entry.stop) ? entry.duration : 0;
        });

        let response = Object.keys(items).map((date) => {
            return {
                date,
                entries: items[date]
            };
        });

        response.forEach((data, key) => {
            let totalDuration = data.entries.reduce((n, {duration}) => n + duration, 0);

            response[key].duration = totalDuration;
            response[key].durationFormatted = dayjs.duration(totalDuration * 1000).format('HH:mm');
        });

        response.forEach((date) => {
            date.entries.forEach((entry) => {
                date.entries.forEach((entry2) => {
                    if (entry.id !== entry2.id && entry2.startUnix > entry.startUnix && entry2.stopUnix && entry2.startUnix < entry.stopUnix) {
                        entry2.error = true;
                        entry.error = true;
                    }
                });
            });
        });

        res.json({
            totalDuration: totalDuration ? formatTime(totalDuration) : null,
            entries: response
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const formatTime = (seconds) => {
    let duration = dayjs.duration(seconds * 1000);
    let hours = parseInt(duration.asHours());
    let minutes = parseInt(duration.asMinutes()) % 60;

    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
}

module.exports = {
    getDevelopers,
    getManagers,
    stopTracker,
    getEntries
}