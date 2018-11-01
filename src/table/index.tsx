import * as React from 'react'
import classnames from 'classnames'

interface Props {
  data: Array<any>
  columns: Array<any>
  type: String
}

export default class Table extends React.Component<Props> {
  get data() {
    const { columns, data } = this.props

    return data.map(item => {
      const row = { key: item.key, data: [] }
      columns.forEach(({ key }) => row.data.push(item[key] || ''))
      return row
    })
  }

  render() {
    const { columns, type } = this.props

    return (
      <table className={classnames('ze-table', 'ze-table-' + type)}>
        <thead>
          <tr>
            {
              columns.map(column => <th key={column.key}>{column.label}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            this.data.map(row => {
              return (
                <tr key={row.key}>
                  {
                    row.data.map((item, index) => <td key={index}>{item}</td>)
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}