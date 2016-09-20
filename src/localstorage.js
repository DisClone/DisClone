export const loadState = () => {
  try{
    const userId = localStorage.getItem('UserId');
    if (userId === null) {
      return undefined;
    }
    return (userId);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem('UserId', state.user.userData.id);
  } catch(err) {
    //ignores errors
  }
}

export const logOut = () => {
  try {
    localStorage.clear();
  } catch(err) {
    console.log(err);
  }
}
