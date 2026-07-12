export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin">
        <div className="w-12 h-12 border-4 border-dark-700 border-t-accent-600 rounded-full"></div>
      </div>
    </div>
  );
}
