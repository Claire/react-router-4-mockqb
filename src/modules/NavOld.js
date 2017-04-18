import React from 'react';
import {NavLink, Link, Route} from 'react-router-dom';
import RouteWithSubroutes from './RouteWithSubroutes';
import Report from './Report';
import About from './About';
import history from '../history';
import Chance from 'chance';
import _ from 'lodash';
let chance = new Chance();

const repoRoutes =  [
    {
        path: '/:prenest/nest/:id',
        component: Report
    },
    {
        path: '/repos/report/:rptId',
        component: Report
    }];

export default React.createClass({
    render() {
        let date = new Date();
        return (
      <div>
        <h2>Repos</h2>
        <ul>
          <li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>

        </ul>

          <div>{this.props.location.pathname}</div> in Repos component children follow:
          {/* will render `Repo.js` when at /repos/:userName/:repoName */}

          <div className="mainContent" > Main inner content
              {repoRoutes.map((route, i) => {
                  route.routeProps = {myLocalProp:"hello-" + i, user:"Tim" + date} ;
                  return  <RouteWithSubroutes key={i} {...route} />;
              }
              )}
              <Route exact path="/repos/report/tellit" component={About} />
              Child Table Below
              <Route render={(routeProps) => {
                  console.log("match = " + JSON.stringify(routeProps.match));
                  console.log("loc = " + JSON.stringify(routeProps.location));
                  console.log("hist = " + JSON.stringify(routeProps.history));
                  console.log("this.props = " + JSON.stringify(this.props));
                  let currPath = routeProps.location.pathname;
                  let rando = getRandomInt(1, 10);

                  function getRandomInt(min, max) {
                      min = Math.ceil(min);
                      max = Math.floor(max);
                      return Math.floor(Math.random() * (max - min)) + min;
                  }

                  function makeARow(i) {
                      let newPath = `${routeProps.location.pathname}/nest/${rando}`;
                      let nextPath = `${routeProps.location.pathname}/nest/:id`;
                  }


                  function getRows(theHistory, prefix, numRows) {
                      let tableRows =  _.map(_.range(numRows), (id) => {
                          let first = chance.first();
                          let last = chance.last();
                          return (
                              <tr key={id} onClick={() => handleLinkTo(theHistory, prefix, id)}>
                              <td>{first}</td>
                              <td>{last}</td>
                              <td>{id}</td>
                              </tr>);
                      });
                      return tableRows;
                  }
                  if (currPath[currPath.length - 1] === '/') {
                      currPath.substr(0, currPath.length - 1);
                  }
                  let prefix = `${routeProps.location.pathname}/nest${rando}`;
                  let newNestRoute = `${prefix}/:id`;
                  let theHistory = history;

                  // render a child table with a general route for an recordlink in it
                  // and a link for each row ? or a function that handles the click to
                  // the route added
                  return (

                  <div>
                      <Route path={newNestRoute} render={(routePropsInner) => {
                          return (
                              <div>
                                  <div>Hi from inner match {routePropsInner}</div>
                              </div>);
                      }}/>
                      <table>
                          <tr>
                              <th>First name</th><th>Last name</th><th>id</th>
                          </tr>
                          <tbody>
                          {getRows(theHistory, prefix, 15)}
                          </tbody>
                      </table>

                          {/*
                      <Link to={newPath}>traverse here row 1</Link>
                      <Route path={newPath} render={(routePropsInner) => {
                          let newPathInner = `${routePropsInner.location.pathname}/nest/${rando2}`;
                          let rando2 = getRandomInt(1, 10);
                          return (
                              <div>
                               <div>Hi from inner match {rando2}</div>
                              </div>);
                      }}/>
                      */}
                      <div>
                          <About {...routeProps} thisDate={date}/>
                      </div>
                  </div>
                  );
              }}/>

              {/*this.props.children*/}
              {/*this.props.children.map((child, i) => {
                  //if its a route child then what?
                  return <div>{i}.{typeof child} - {console.dir(child)}</div>;
              })*/}
              {/* React.cloneElement(this.props.children, {
                  ...this.props,
                  key: this.props.location,
                  navProp:"here is nav info"
                  }
              */}
          </div>
      </div>
        );
    }
});
