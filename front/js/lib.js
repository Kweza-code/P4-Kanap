
function getUrlParam(paramName = "")
{
    var url = new URL(window.location.href);
    var result = url.searchParams.get(paramName);
    
    return result;
}
