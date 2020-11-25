module.exports.getLocalUserInfo = () => {
    const data = localStorage.getItem('data');
    if (!data) return null;
    return JSON.parse(data);
}