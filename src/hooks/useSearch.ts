// useSearch.ts
import type { JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';


import type { OutputOption } from '@/utils/formats';
import { addFilterValue, resetFilter } from 'src/store/filterStore';

interface UseSearchProps {
  [key: string]: OutputOption[];
}

interface UseSearchResult {
  filtersSelected: { [key: string]: OutputOption };
  searchParams: string;
  handleSelect: (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => void;
  handleCheckboxChange: (id: string, value: string) => void;
  handleOnChange: (e: Event) => void;
  handleSubmit: (e: MouseEvent) => void;
  resetSelect: (defaultOptions: { [key: string]: OutputOption }) => void;
  fParams: (filters: { [key: string]: OutputOption }) => void;
  // handleActive: (id: string, value: string) => void;
}

export const useSearch = (
  selects: UseSearchProps,
  defaultValues: { [key: string]: OutputOption }
): UseSearchResult => {
  const [filtersSelected, setFiltersSelected] = useState<{ [key: string]: OutputOption }>(defaultValues);
  const [filterParams, setFilterParams] = useState<string>('');

  // Function to update filterParams based on filtersSelected
  const fParams = (filters: { [key: string]: OutputOption }) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      const paramValue = filters[key as keyof typeof filters];
      if (typeof paramValue === 'object' && paramValue !== null) {
        params.set(key, paramValue.value);
      } else {
        params.delete(key);
      }
    });
    setFilterParams(params.toString().replace(/&?[^=&]+=All/g, ''));
  };

  // Effect to run whenever filtersSelected changes
  useEffect(() => {
    fParams(filtersSelected);
  }, [filtersSelected]);

  // Effect to load default filter values to the store
  useEffect(() => {
    addFilterValue(defaultValues);
  }, []);

  // Function to handle filter selection
  const handleSelect = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLSelectElement;
    if (id === 'in_tpr') {
      const newFiltersSelected = { ...filtersSelected };
      if (filtersSelected['in_tpr'] && filtersSelected['in_tpr'].value === 'COUNTRY') {
        // Si ya está seleccionado como 'COUNTRY', lo eliminamos
        delete newFiltersSelected['in_tpr'];
      } else {
        // De lo contrario, lo marcamos como 'COUNTRY'
        const newFilter = selects[id].find((item) => item.value === 'COUNTRY');
        if (newFilter) {
          newFiltersSelected[id] = newFilter;
        }
      }
      setFiltersSelected(newFiltersSelected);
      addFilterValue({ [id]: newFiltersSelected[id] });
    } else {
      const newFiltersSelected = { ...filtersSelected };
      const newFilter = selects[id].find((item) => item.value === value);
      if (newFilter) {
        newFiltersSelected[id] = newFilter;
      } else {
        delete newFiltersSelected[id];
      }
      setFiltersSelected(newFiltersSelected);
      addFilterValue({ [id]: newFiltersSelected[id] });
    }
  };
  // Function to handle checkbox change
  const handleCheckboxChange = (id: string, value: string) => {
    setFiltersSelected((prevFilters) => ({
      ...prevFilters,
      [id]: { value, label: id },
    }));
    addFilterValue({ [id]: { value, label: id } });
  };

  const handleOnChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      const { id, value } = e.target;
      setFiltersSelected((prevFilters) => ({
        ...prevFilters,
        [id]: { value, label: id },
      }));
      addFilterValue({ [id]: { value, label: id } });
    }
  };

  // Function to handle form submission
  const handleSubmit = (e: MouseEvent) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    const newParams = { ...filtersSelected };
    Object.keys(newParams).forEach((key) => {
      const paramValue = newParams[key as keyof typeof newParams];
      if (typeof paramValue === 'string' && paramValue !== '') {
        params.set(key, paramValue);
      } else {
        params.delete(key);
      }
    });

    // Navigation or return the constructed URL based on your needs
  };

  // Function to reset filters to default values
  const resetSelect = (defaultValues: { [key: string]: OutputOption }) => {
    resetFilter(defaultValues);
    setFiltersSelected(defaultValues);
  };

  // The hook returns the state and functions needed by the component
  return {
    filtersSelected,
    searchParams: filterParams,
    handleSelect,
    handleSubmit,
    handleOnChange,
    fParams,
    resetSelect,
    handleCheckboxChange,
  };
};
