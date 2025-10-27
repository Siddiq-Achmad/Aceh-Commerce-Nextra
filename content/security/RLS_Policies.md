# Luxima Core Platform — RLS Policy
```sql
-- ==============================================
-- Luxima Core Platform — Row Level Security (RLS)
-- ==============================================

-- 1. Enable RLS di semua tabel tenant-based
ALTER TABLE core.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE core.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE core.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE core.plugins ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing.subscriptions ENABLE ROW LEVEL SECURITY;

-- 2. Policy: Tenant Isolation
CREATE POLICY tenant_isolation_select ON core.organizations
FOR SELECT USING (tenant_id = current_setting('request.jwt.claim.tenant_id', true));

CREATE POLICY tenant_isolation_select ON core.projects
FOR SELECT USING (tenant_id = current_setting('request.jwt.claim.tenant_id', true));

CREATE POLICY tenant_isolation_select ON core.users
FOR SELECT USING (tenant_id = current_setting('request.jwt.claim.tenant_id', true));

CREATE POLICY tenant_isolation_select ON core.plugins
FOR SELECT USING (tenant_id = current_setting('request.jwt.claim.tenant_id', true));

CREATE POLICY tenant_isolation_select ON billing.subscriptions
FOR SELECT USING (tenant_id = current_setting('request.jwt.claim.tenant_id', true));

-- 3. Policy: Insert hanya boleh dari tenant aktif
CREATE POLICY tenant_isolation_insert ON core.projects
FOR INSERT WITH CHECK (tenant_id = current_setting('request.jwt.claim.tenant_id', true));

-- 4. Policy: Update/Delete hanya oleh admin tenant
CREATE POLICY tenant_admin_update ON core.projects
FOR UPDATE USING (
  tenant_id = current_setting('request.jwt.claim.tenant_id', true)
  AND current_setting('request.jwt.claim.role', true) = 'admin'
);

CREATE POLICY tenant_admin_delete ON core.projects
FOR DELETE USING (
  tenant_id = current_setting('request.jwt.claim.tenant_id', true)
  AND current_setting('request.jwt.claim.role', true) = 'admin'
);

-- 5. Policy: Audit Log Read untuk superadmin
CREATE POLICY superadmin_audit_access ON internal.audit_logs
FOR SELECT USING (current_setting('request.jwt.claim.role', true) = 'superadmin');




-- 6. Policy: Tenant Isolation untuk audit log (optional)
CREATE POLICY tenant_isolation_select ON internal.audit_logs
FOR SELECT USING (tenant_id = current_setting('request.jwt.claim.tenant_id', true));

-- 7. Policy: Insert hanya boleh dari tenant aktif (optional)
CREATE POLICY tenant_isolation_insert ON internal.audit_logs
FOR INSERT WITH CHECK (tenant_id = current_setting('request.jwt.claim.tenant_id', true));
```