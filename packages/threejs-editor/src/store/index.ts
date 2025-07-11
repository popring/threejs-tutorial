// import type { BoxGeometry, CylinderGeometry } from 'three';
import { create } from 'zustand';

let id = 1;

export type MeshTypes = 'Box' | 'Cylinder';

// type MeshCylinderProps = CylinderGeometry['parameters'];
// type MeshBoxProps = BoxGeometry['parameters'];
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
    scale?: {
      x: number;
      y: number;
      z: number;
    };
    rotation?: {
      x: number;
      y: number;
      z: number;
    };
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
  updateMeshInfo: (
    name: string,
    info: { x: number; y: number; z: number },
    type: 'position' | 'scale' | 'rotation',
  ) => void;
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
    updateMeshInfo(
      name: string,
      info: { x: number; y: number; z: number },
      type: 'position' | 'scale' | 'rotation',
    ) {
      set((state) => {
        return {
          data: {
            ...state.data,
            meshArr: state.data.meshArr.map((item) => {
              if (item.name === name) {
                if (type === 'position') {
                  item.props.position = info;
                } else if (type === 'scale') {
                  item.props.scale = info;
                } else if (type === 'rotation') {
                  item.props.rotation = {
                    x: info.x,
                    y: info.y,
                    z: info.z,
                  };
                }
              }
              return item;
            }),
          },
        };
      });
    },
  };
});
