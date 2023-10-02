class UserDto {
    id;
    name;
    email;
    password;
    toggl_api_key;
    role;
    parent_id;

    constructor(user = {}) {
        this.id = user.id ?? null;
        this.name = user.name ?? '';
        this.email = user.email ?? '';
        this.password = user.password ?? '';
        this.toggl_api_key = user.toggl_api_key ?? '';
        this.role = user.role ?? '';
        this.parent_id = user.parent_id ?? ''
    }
}

export default UserDto;