import Home from '../contioners/home/home';
import Classify from '../contioners/classify/classify';
import Details from '../contioners/details/details';
import Facade from '../contioners/facade/facade';
import Floor from '../contioners/floor/floor';
import Model from '../contioners/model/model';
import City from '../contioners/city/city';

export default [
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [],
    },
    {
        path: '/classify',
        name: 'classify',
        component: Classify,
        children: [],
    },
    {
        path: '/details/:id',
        name: 'details',
        component: Details,
        children: [],
    },
    {
        path: '/facade/:id',
        name: 'facade',
        component: Facade,
        children: [],
    },
    {
        path: '/floor/:id',
        name: 'floor',
        component: Floor,
        children: [],
    },
    {
        path: '/model/:id',
        name: 'model',
        component: Model,
        children: [],
    },
    {
        path: '/city',
        name: 'city',
        component: City,
        children: [],
    },
];
