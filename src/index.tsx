import dva from 'dva';
import RouterView from './router/index';
import { createModel } from './store/index';
import '@/assets/css/index.css';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';

const createBrowserHistory = require('history').createBrowserHistory;
const app = dva({
    history: createBrowserHistory(),
});

createModel(app);
app.router(RouterView);
app.start('#root');
