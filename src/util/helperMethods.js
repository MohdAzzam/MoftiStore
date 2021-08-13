function getQueryParams() {
    return new URLSearchParams(window.location.search);
}

/**
* Check if there is error in feilds seterror 
* 
* @param {String} errorMessage 
*/
function setPropertyErrorMessage(feilds, errorMessage, setError) {
    feilds.forEach(element => {
        console.log(errorMessage);
        if (errorMessage.includes(element.key)) {
            setError(element.name, {
                message: element.errorMessage ? element.errorMessage : errorMessage,
                options: element.errorOptions ? element.errorOptions : {}
            });
        }
    });
}

export { getQueryParams, setPropertyErrorMessage };