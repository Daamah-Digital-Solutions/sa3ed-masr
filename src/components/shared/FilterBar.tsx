import { Chip } from '@/components/ui/Chip';

interface FilterOption {
  id: string;
  label: string;
  icon?: string;
}

interface FilterBarProps {
  options: FilterOption[];
  selected: string;
  onSelect: (id: string) => void;
}

export function FilterBar({ options, selected, onSelect }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Chip
        selected={selected === 'all'}
        onClick={() => onSelect('all')}
        variant="primary"
      >
        الكل
      </Chip>
      {options.map((option) => (
        <Chip
          key={option.id}
          selected={selected === option.id}
          onClick={() => onSelect(option.id)}
          variant="primary"
        >
          {option.icon && <span className="ml-1">{option.icon}</span>}
          {option.label}
        </Chip>
      ))}
    </div>
  );
}
