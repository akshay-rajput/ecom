export const checkExistanceInArray = (array, id) => {
    // returns true or false
    return !!array.find((item) => item._id === id);
};