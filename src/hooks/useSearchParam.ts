export function useSearchParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let searchValue = urlParams.get('search');
    
    return searchValue;
}