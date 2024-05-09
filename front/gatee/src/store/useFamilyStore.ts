import {create} from "zustand";

type FamilyStore = {
    familyId: string;
    setFamilyId: (newId: string) => void;
    familyName: string;
    setFamilyName: (newName: string) => void;
    familyImage: File | null;
    setFamilyImage: (newImage: File | null) => void;
    familyCode: string;
    setFamilyCode: (newCode: string) => void;
}

export const useFamilyStore = create<FamilyStore>(
    (set) => ({
        familyId: "",
        setFamilyId: (newId: string) => set({ familyId: newId }),
        familyName: "",
        setFamilyName: (newName: string) => set({ familyName: newName }),
        familyImage: null,
        setFamilyImage: (newImage: File | null) => set({familyImage: newImage}),
        familyCode: "",
        setFamilyCode: (newCode: string) => set({ familyCode: newCode }),
    })
);