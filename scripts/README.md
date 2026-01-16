Migration scripts
=================

This folder contains safe, idempotent migration scripts for reconciling existing Atlas documents with the application's Mongoose schemas.

Files:
- `migrateBookings.mjs` — sets missing `package` fields on `Booking` documents to `'Basic'`, and lists bookings missing `date`/`time` for manual review.
- `migrate-template.mjs` — a minimal template to create other collection migrations.

Safety checklist (must do before --apply):
1. Take a full backup of the production DB with `mongodump` or Atlas snapshot.
2. Run the migration in dry-run mode first (default or `--dry`) and inspect the output.
3. If the dry-run looks correct, run with `--apply` to perform updates.

Examples (PowerShell):

```powershell
# Dry-run (no changes)
node .\scripts\migrateBookings.mjs --dry --uri "<YOUR_MONGO_URI>"

# Apply changes (destructive)
node .\scripts\migrateBookings.mjs --apply --uri "<YOUR_MONGO_URI>"
```

Notes:
- The scripts import the existing Mongoose models from `server/models`. They require Node >=14 with ES module support (the project uses ESM).
- Do not run `--apply` until you have a verified backup.
- I can add migration scripts for other collections (payments, reports, tests) — reply with which ones to create.
