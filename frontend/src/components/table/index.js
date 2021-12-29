import MaterialTable from 'material-table';
import { tableIcons } from '../../utils/tableIcons';

const Editable = ({ columns, title, data, editable, options }) => {

  return (
    <MaterialTable
      icons={tableIcons}
      title={title}
      options={options}
      columns={columns}
      data={data}
      editable={editable}
    />
  )
}

export default Editable;