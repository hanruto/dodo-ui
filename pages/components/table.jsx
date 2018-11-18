import React from 'react'
import Table from '../../src/table'

const columns = [
  { label: '姓名', key: 'name' },
  { label: '年龄', key: 'age' },
  { label: '工作', key: 'job' }
]

const data = [
  { name: '小寒', age: '13', job: '没有', key: 1 },
  { name: '小白', age: '14', job: '没有', key: 2 },
  { name: '小王', age: '15', job: '没有', key: 3 },
]

export default class Page extends React.Component {
  render() {
    return (
      <>
        <h2>普通表格</h2>
        <Table columns={columns} data={data} />

        <h2>简约表格</h2>
        <Table columns={columns} data={data} type="easy"/>

        <h2>格子表格</h2>
        <Table columns={columns} data={data} type="grid" />

        <h2>斑马线表格</h2>
        <Table columns={columns} data={data} type="zebra" />
      </>
    )
  }
}