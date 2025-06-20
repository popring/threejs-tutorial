import './index.scss';
import { Menu as AntdMenu } from 'antd';
import { useThreeStore, type MeshTypes } from '../../store';

const items = [
  {
    label: 'Add',
    key: 'add',
    children: [
      {
        type: 'group',
        label: 'Mesh',
        children: [
          { label: '立方体', key: 'Box' },
          { label: '圆柱', key: 'Cylinder' },
        ],
      },
      {
        type: 'group',
        label: 'Light',
        children: [
          { label: '点光源', key: 'PointLight' },
          { label: '平行光', key: 'DirectionalLight' },
        ],
      },
    ],
  },
];

function Menu() {
  const { addMesh } = useThreeStore();
  function handleClick(e: any) {
    console.log(e.key);
    addMesh(e.key as MeshTypes);
  }

  return (
    <div className='Menu'>
      <AntdMenu
        mode='horizontal'
        onClick={handleClick}
        style={{ height: 60 }}
        items={items}
      />
    </div>
  );
}

export default Menu;
