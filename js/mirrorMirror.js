function evilTwin(obj) {
    return function addGoatee() {
        const twin = Object.create(obj);
        twin.hasGoatee = true;
        return twin;
    }
}
