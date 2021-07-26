import logo from './logo.svg';
import './App.css';
import {MyRoute, Tree} from "./component/MyRoute";
import 'antd/dist/antd.css';

const data = [
    { name: 'src', children: [
            { name: 'css', children: [] },
            { name: 'js', children: [
                    { name: 'utils', children: [] },
                    { name: 'components', children: [] }
                ]}
        ]},
    { name: 'public', children: [
            { name: 'images', children: [] }
        ]}
]

function App() {
    return (
        <div className="App">
            <MyRoute/>
        </div>
    );
}

export default App;
