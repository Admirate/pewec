type DateDisplayProps = {
  date: string;
  showTime?: boolean;
};

export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  });
}

export function formatDateWithTime(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateMobile(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export function formatDateDesktop(dateString: string, includeSeconds = false) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  if (includeSeconds) {
    options.second = "2-digit";
  }

  return new Date(dateString).toLocaleDateString("en-GB", options);
}

export default function DateDisplay({ date, showTime = true }: DateDisplayProps) {
  return (
    <span className="whitespace-nowrap">
      {showTime ? formatDateWithTime(date) : formatDate(date)}
    </span>
  );
}
