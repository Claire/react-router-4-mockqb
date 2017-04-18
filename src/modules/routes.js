import {withRouter} from 'react-router-dom';
import AppMain from './AppMain';
import About from './About';
import NavWrapper from './NavWrapper';
//import Repo from './Repo';
import OtherPage from './OtherPage';
import Builder from './Builder';
import Report from './Report';
import Plain from './Plain';
import Record from "./Record";
import DrawerRecord from "./DrawerRecord";
import ReportTable from "./ReportTable";

//
// let recordSubRoutes = [
//     {
//         path: '/app-table/report/:rptId/record/:recId',
//         component: withRouter(Record),
//         props: {header: 'Record'}
//     },
//     {
//         path: '/app-table/report/:rptId/record/:recId/navChild_:childTable/:childRec',
//         //exact: true,
//         component: withRouter(DrawerRecord),
//         props: {
//             header: 'traversing relationship records',
//             recordLinks: 'record/'
//         },
//         routes: [
//             {
//                 path: '/app-table/report/:rptId/record/:recId/navChild_:childTable/:prevChildRec/:nestChild_childRec*!/nestChild_:childRec',
//                 component: withRouter(DrawerRecord),
//                 exact: true,
//                 props: {
//                     header: 'traversing relationship records deeper',
//                     recordLinks: 'record/'
//                 }
//             }
//         ]
//     }
// ];

//  our route config
export default [
    {
        path: '/',
        component: AppMain
    },
    {
        path: '/app-table',
        component: NavWrapper,
        routes: [
            {
                path: '/app-table/otherPage',
                component: OtherPage
            },
            {
                path: '/app-table/builder',
                component: Builder
            },
            {
                path: '/app-table/report/:rptId',
                component: Report,
                props: {
                    recordLinks: 'record/',
                },
                routes: [
                    {
                        path: '/app-table/report/:rptId/record/:recId',
                        component: withRouter(Record),
                        exact: true,
                        props: {
                            header: 'Record',
                            recordLinks: 'record/',
                        },
                        routes: [
                            {
                                path: '/app-table/report/:rptId/record/:recId/navChild_:childTable/:childRec',
                                //exact: true,
                                component: withRouter(DrawerRecord),
                                props: {
                                    header: 'traversing relationship records',
                                    recordLinks: 'record/'
                                },
                                routes: [
                                    {
                                        path: '/app-table/report/:rptId/record/:recId/navChild_:childTable/:prevChildRec/:nestChild_childRec*!/nestChild_:childRec',
                                        component: withRouter(DrawerRecord),
                                        exact: true,
                                        props: {
                                            header: 'traversing relationship records deeper',
                                            recordLinks: 'record/'
                                        }
                                    }
                                ]


                            }
                        ]
                    },
                    {
                        path: '*report/:id',
                        component: withRouter(ReportTable),
                        props: {
                            recordLinks: 'record/'
                        },
                        exact: true,
                    }
                ]
            },
            {
                path: '/app-table/report',
                exact: true,
                component: Plain
            },
            // {
            //     path: '/app-table/:userName/:repoName',
            //     component: Repo,
            //     extraProp: 'badass'
            // }
        ]
    },
    {
        path: '/about',
        component: About
    },
];
