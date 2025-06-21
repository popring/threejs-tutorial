import { create } from 'zustand';

let id = 1;

export type MeshTypes = 'Box' | 'Cylinder';
export interface MeshData {
  id: number;
  type: MeshTypes;
  name: string;
  props: {
    width?: number;
    height?: number;
    depth?: number;
    material: {
      color: string;
    };
    position: {
      x: number;
      y: number;
      z: number;
    };
    radiusTop?: number;
    radiusBottom?: number;
  };
}

// 写一个 initialState 的类型
export type InitialState = {
  data: {
    meshArr: MeshData[];
  };
  selectedObj: any;
};

const initialState: InitialState = {
  data: {
    meshArr: [
      {
        id,
        type: 'Box',
        name: 'Box1',
        props: {
          width: 500,
          height: 200,
          depth: 200,
          material: {
            color: 'orange',
          },
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
      },
    ],
  },
  selectedObj: null,
};

function createBox(): MeshData {
  const newId = ++id;
  return {
    id: newId,
    type: 'Box',
    name: 'Box' + newId,
    props: {
      width: 200,
      height: 200,
      depth: 200,
      material: {
        color: 'orange',
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  };
}

function createCylinder(): MeshData {
  const newId = ++id;
  return {
    id: newId,
    type: 'Cylinder',
    name: 'Cylinder' + newId,
    props: {
      radiusTop: 200,
      radiusBottom: 200,
      height: 300,
      material: {
        color: 'orange',
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  };
}

type ThreeStore = typeof initialState & {
  addMesh: (type: MeshTypes) => void;
  setSelectedObj: (obj: any) => void;
  removeObj: (obj: any) => void;
  updateMeshPositon: (name: string, position: { x: number; y: number; z: number }) => void;
};

export const useThreeStore = create<ThreeStore>((set) => {
  return {
    ...initialState,
    addMesh(type: MeshTypes) {
      function addItem(creator: () => MeshData) {
        set((state) => {
          return {
            data: {
              ...state.data,
              meshArr: [...state.data.meshArr, creator()],
            },
          };
        });
      }
      if (type === 'Box') {
        addItem(createBox);
      } else if (type === 'Cylinder') {
        addItem(createCylinder);
      }
    },
    setSelectedObj(obj: any) {
      set({
        selectedObj: obj,
      });
    },
    removeObj(name: string) {
      set((state) => {
        console.log('state.data.meshArr', state.data.meshArr);
        return {
          data: {
            ...state.data,
            meshArr: state.data.meshArr.filter((item) => item.name !== name),
          },
          selectedObj: null,
        };
      });
    },
    updateMeshPositon(name: string, position: { x: number; y: number; z: number }) {
      set(state => {
        return {
          data: {
            ...state.data,
            meshArr: state.data.meshArr.map((item) => {
              if (item.name === name) {
                return { ...item, props: { ...item.props, position } };
              }
              return item;
            }),
          }
        }
      })
    },
  };
});
