import {Excel} from '@/components/excel/Excel'
import {Header} from './components/header/Header';
import {Toolbar} from './components/toolbar/Toolbar';
import {Formula} from './components/formula/Formula';
import {Table} from './components/table/Table';
import {createStore} from './core/createStore'
import {rootReduser} from './redux/rootReduser'
import {storage} from './core/untils';
import {initial} from './redux/initial'
import './scss/index.scss'

const store = createStore(rootReduser, initial);

// eslint-disable-next-line no-console
store.subscribelStore(state => storage('excel-state', state) )

window.store = store

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table], store
})

excel.render()
