type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string /* Date */;
    two_factor_secret: string | null;
    two_factor_recovery_codes: string | null;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
};
