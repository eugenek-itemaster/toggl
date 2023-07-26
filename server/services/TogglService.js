const axios = require('axios');
class TogglService {
    api = axios.create({
        baseURL: 'https://api.track.toggl.com/api/v9/'
    });

    constructor() {

    }

    getUser = async (token) => {
        try {
            let response = await this.api.get('me', {
                auth: {
                    username: token,
                    password: 'api_token'
                }
            });

            return response.data;
        } catch (error) {
            return false;
        }
    }

    getCurrentEntry = async (token) => {
        try {
            let response = await this.api.get('me/time_entries/current', {
                auth: {
                    username: token,
                    password: 'api_token'
                }
            });

            return response.data;
        } catch (error) {
            return false;
        }
    }

    getEntries = async (token, start_date = '', end_date = '') => {
        try {
            let endpoint = 'me/time_entries';

            let data = {
                start_date: start_date,
                end_date: end_date
            };

            endpoint += '?' + new URLSearchParams(data);

            let response = await this.api.get(endpoint, {
                auth: {
                    username: token,
                    password: 'api_token'
                }
            });

            return response.data;
        } catch (error) {
            return [];
        }
    }

    stopEntry = async (token, workspaceId, entryId) => {
        try {
            let endpoint = `workspaces/${workspaceId}/time_entries/${entryId}/stop`;

            let response = await this.api.patch(endpoint, {}, {
                auth: {
                    username: token,
                    password: 'api_token'
                }
            });

            return response.data;
        } catch (error) {
            return false;
        }
    }
}

module.exports = TogglService;