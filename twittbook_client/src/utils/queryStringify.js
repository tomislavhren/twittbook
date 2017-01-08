export default (args) => {
    let query = '';
    for (let key in args) {
        query += `${key}=${encodeURIComponent(args[key])}&`
    }

    return query.trim('&');
}