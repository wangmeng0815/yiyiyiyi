import axios from 'axios';

let instance = axios.create({
    baseURL: '/api',
    timeout: 1000,
});

const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
    // 401: 未登录状态，跳转登录页   
        case 401:
        // toLogin();
        break;
    // 403 token过期
    // 清除token并跳转登录页
        case 403:
        console.log('登录过期，请重新登录');
        // localStorage.removeItem('token');
        // store.commit('loginSuccess', null);
        setTimeout(() => {
              toLogin();
        }, 1000);
       break;
   // 404请求不存在
        case 404:
        console.log('请求的资源不存在');
      break;
      default:
      console.log(other);
}}

// * 请求拦截器
// instance.interceptors.request.use(config => {
//     // 登录流程控制中，根据本地是否存在token判断用户的登录情况
//     // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
//     // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态 码
//     // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
//     const token = store.state.token;
//     token && (config.headers.Authorization = token);
//     return config;
// }, error => {
//     Promise.error(error)
// });


// * 响应拦截器
instance.interceptors.response.use( res => {
    return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data)
}, error => {
    const { response } = error;
    if (response) {
        // 请求已发出，但是不在2xx的范围
        errorHandle(response.status, response.data.message);
        return Promise.reject(response);
    // } else {
    //     // 处理断网的情况
    //     // eg:请求超时或断网时，更新state的network状态
    //     // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    //     // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    //     store.commit('changeNetwork', false);　　
    }
});

export default instance;