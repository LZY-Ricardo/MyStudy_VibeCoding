import create from "./myZustand";

const useListStore = create((set,get) => {
    return {
        data: ['html'],
        addData: (item) => {
            set((state) => {
                return {
                    data: [...state.data, item]
                }
            })
        }
    }
}) 

export default useListStore