export default function SamuraiDivider() {
  return (
    <div className="my-16 flex items-center justify-center space-x-4">
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-crimson" />
      <div className="flex items-center space-x-1">
        <div className="h-1.5 w-1.5 rotate-45 bg-gold" />
        <span className="font-display text-xs tracking-widest text-gold text-[10px] mx-1">武士道</span>
        <div className="h-1.5 w-1.5 rotate-45 bg-gold" />
      </div>
      <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-crimson" />
    </div>
  );
}
