const RoleUser          = (1 << 0);
const RoleMaintainer    = (1 << 1);
const RoleAdministrator = (1 << 2);
const RoleRoot          = (1 << 3);

const getRoles = (r) => {
    var roles = [];
    if ((r & RoleUser) > 0) {
        roles.push("user");
    }
    if ((r & RoleMaintainer) > 0) {
        roles.push("maintainer");
    }
    if ((r & RoleAdministrator) > 0) {
        roles.push("administrator");
    }
    if ((r & RoleRoot) > 0) {
        roles.push("root");
    }

    return roles.join(' | ');
};

const hasRole = (roles, target) => {
    return (roles & target) > 0
};

export { getRoles, hasRole, RoleUser, RoleMaintainer, RoleAdministrator, RoleRoot };
