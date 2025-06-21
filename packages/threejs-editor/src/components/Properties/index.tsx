import { useThreeStore } from '../../store';

function Properties() {
  const { selectedObj } = useThreeStore();

  console.log('selectedObj', selectedObj);

  return (
    <div className='Properties'>
      <pre>{JSON.stringify(selectedObj, null, 2)}</pre>
    </div>
  );
}

export default Properties;
