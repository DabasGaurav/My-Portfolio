type ComingSoonProps = {
  milestone: string;
};

/**
 * Shared placeholder for any homepage section not built yet, so unbuilt
 * sections look like one deliberate system instead of scattered stubs.
 */
export function ComingSoon({ milestone }: ComingSoonProps) {
  return (
    <div className="rounded-sm border border-dashed border-hairline px-6 py-10 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {milestone}
      </p>
    </div>
  );
}
