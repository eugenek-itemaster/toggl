class UserDto {
    _id;
    name;
    email;
    password;
    toggl_api_key;

    constructor(user = {}) {
        this._id = user._id ?? null;
        this.name = user.name ?? '';
        this.email = user.email ?? '';
        this.password = user.password ?? '';
        this.toggl_api_key = user.toggl_api_key ?? '';
    }
}

export default UserDto;