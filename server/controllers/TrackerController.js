const {ROLE_ADMIN, ROLE_DEVELOPER} = require("../constants/constans");
const UserRepository = require("../repositories/UserRepository");
const TogglService = require("../services/TogglService");
const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");

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
                        let entryStart = dayjs(entry.start);
                        let entryStop = dayjs(entry.stop);

                        time += parseInt(entryStop.diff(entryStart));
                    }
                });
            }
        }

        response.push({
            id: user._id,
            name: user.name,
            status: status,
            time: dayjs.duration(time).format('HH:mm'),
            action: action
        });
    }

    res.json(response);
}

module.exports = {
    getDevelopers
}