
// User相關的 api
const userRequest = axios.create({
  //baseURL: 'http://localhost:8080/home'
  baseURL: 'https://4213-2001-b400-e350-5116-c8e0-d151-942b-81d2.jp.ngrok.io/'
});
// 文章相關的 api
const articleRequest = axios.create({
  baseURL: 'localhost:8080/article/'
});
// 搜尋相關的 api
const searchRequest = axios.create({
  baseURL: 'localhost:8080/api/search/'
});

export const axiosMethod= function(instance,method, url, data = null, config) {
method = method.toLowerCase();
switch (method) {
    case "post":
      console.log("post:",url)
    return instance.post(url, data, config);
    case "get":
    return instance.get(url, { params: data });
    case "delete":
    return instance.delete(url, { params: data });
    case "put":
    return instance.put(url, data);
    case "patch":
    return instance.patch(url, data);
    default:
    console.log(`未知的 method: ${method}`);
    return false;
}
}

export const userSignUp = (signUpData) => {
  console.log("signUpData:",signUpData);
  return axiosMethod(userRequest,"post", "/signIn", signUpData)
}

export const userLogIn = (logInData) => {
  return axiosMethod(userRequest,"post", "/logIn", logInData)
}

export const userLogOut = () => {
  return axiosMethod(userRequest,"get", "/logOut")
}

export const userDelete = (userNo) => {
  return axiosMethod(userRequest,"delete", "/delete", userNo)
}