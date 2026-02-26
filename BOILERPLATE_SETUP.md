# Mobile App Boilerplate Setup

This is a React Native / Expo boilerplate with authentication, Supabase integration, and a component library ready to use.

## Features Included

- ✅ Authentication (Google Sign In, Apple Sign In, Email/Password)
- ✅ Supabase integration (auth, database, storage stubs)
- ✅ Expo Router (file-based navigation)
- ✅ i18n (internationalization)
- ✅ Zustand (state management)
- ✅ UI Component library
- ✅ Tailwind CSS (via uniwind)
- ✅ Form validation (Zod)

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
pnpm approve-builds  # Required for peer dependency approvals
# or
npm install
```

**Note**: `pnpm approve-builds` is required because some packages have peer dependencies that need manual approval. This is a one-time step after installing dependencies.

### 2. Environment Variables

Create a `.env` file based on `.env.example`:

```bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID=your_google_oauth_client_id
```

### 3. Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Run migrations to create your database schema
3. Generate TypeScript types:

```bash
supabase gen types typescript --schema public > utilities/supabase/database.types.ts
```

4. Implement profile utilities in `utilities/supabase/profile.ts`:

```typescript
import { supabase } from "./index";
import type { Database } from "./database.types";

type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];

export async function getUserProfile(userId: string): Promise<UserProfile> {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from("user_profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### 4. Add Required Assets

This boilerplate references several image assets that you need to add. Create placeholder images in `./assets/images/`:

**Required images:**
- `icon.png` - App icon (1024x1024 recommended)
- `splash-icon.png` - Splash screen logo (200x200 recommended)
- `favicon.png` - Web favicon

**For Android adaptive icon:**
- `android-icon-foreground.png` - Foreground layer
- `android-icon-background.png` - Background layer
- `android-icon-monochrome.png` - Monochrome version

**Quick start:** You can temporarily use Expo's default assets by updating `app.json` to remove the custom image references, or create simple placeholder images using any image editor.

### 5. App Configuration

Update `app.json` with your app details:

- `name`: Your app name
- `slug`: Your app slug
- `scheme`: Your deep link scheme
- `bundleIdentifier` (iOS): Your iOS bundle ID
- `package` (Android): Your Android package name
- `GIDClientID`: Your Google OAuth iOS client ID
- `appleTeamId`: Your Apple Team ID (for Sign In with Apple)

### 6. Google Sign In Setup

**iOS:**
1. Create a Google Cloud project
2. Enable Google Sign-In
3. Create an iOS OAuth client ID
4. Add the reversed client ID to `app.json` under `ios.infoPlist.CFBundleURLSchemes`
5. Add the client ID to `app.json` under `ios.infoPlist.GIDClientID`

**Android:**
1. Create an Android OAuth client ID (using your app's package name)
2. Add the SHA-1 fingerprint of your debug/release keystore
3. No additional config needed in app.json

**Web Client ID:**
- Create a Web OAuth client ID
- Add it to `EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID` in your `.env`

### 7. Apple Sign In Setup

1. Enable "Sign in with Apple" in your Apple Developer account
2. Add your Apple Team ID to `app.json` under `ios.appleTeamId`
3. Ensure `usesAppleSignIn: true` is set in `app.json`

### 8. Start the App

```bash
pnpm start
# or
npm start
```

## Project Structure

```
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation screens
│   ├── _layout.tsx        # Root layout with providers
│   ├── sign-in.tsx        # Sign in screen
│   └── ...
├── components/            # Reusable UI components
│   ├── button.tsx
│   ├── input.tsx
│   └── ...
├── constants/             # App constants
│   ├── route.ts          # Route definitions
│   ├── theme.ts          # Theme config
│   └── ...
├── contexts/              # React contexts
│   └── auth-context.tsx  # Authentication context
├── hooks/                 # Custom React hooks
├── stores/                # Zustand stores
├── utilities/             # Utility functions
│   ├── i18n/             # Internationalization
│   ├── supabase/         # Supabase utilities
│   └── validation/       # Zod schemas
├── types/                 # TypeScript types
└── assets/                # Images, fonts, etc.
```

## Customization

### Database Schema

This boilerplate uses a placeholder database schema. You'll need to:

1. Design your database schema in Supabase
2. Run migrations
3. Generate types: `supabase gen types typescript --schema public > utilities/supabase/database.types.ts`
4. Update `utilities/supabase/profile.ts` with your profile fetching logic

### Navigation

Add new routes in `constants/route.ts` and create screen files in the `app/` directory.

### Styling

The app uses Tailwind CSS via `uniwind`. Update colors and styles in `global.css` and `constants/theme.ts`.

## Common Issues

### Supabase Types Missing

If you see TypeScript errors about Database types, run:

```bash
supabase gen types typescript --schema public > utilities/supabase/database.types.ts
```

### Google Sign In Not Working

- Ensure you've added the correct client IDs to `app.json`
- Check that your OAuth consent screen is configured
- Verify your package name / bundle ID matches your Google Cloud project

### Apple Sign In Not Working

- Ensure you have a valid Apple Developer account
- Check that your Apple Team ID is correct in `app.json`
- Test on a physical device (Apple Sign In doesn't work in simulator)

## Support

For issues specific to this boilerplate, please check the documentation or open an issue.

For framework-specific issues, refer to:
- [Expo Documentation](https://docs.expo.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Navigation](https://reactnavigation.org/)
