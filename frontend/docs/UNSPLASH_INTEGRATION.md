# Unsplash Integration

This project includes a comprehensive Unsplash integration for fetching high-quality placeholder images. The integration provides both API-based images (with Unsplash API key) and fallback images (using Picsum Photos) when no API key is available.

## Features

- ✅ **Unsplash API Integration** - Fetch real images from Unsplash
- ✅ **Fallback Support** - Uses Picsum Photos when no API key is available
- ✅ **React Hooks** - Easy-to-use hooks for fetching images
- ✅ **Predefined Categories** - Common fitness-related image categories
- ✅ **Loading States** - Built-in loading skeletons
- ✅ **Error Handling** - Graceful error handling with fallbacks
- ✅ **Attribution** - Proper Unsplash attribution (required by their terms)
- ✅ **TypeScript Support** - Full TypeScript support

## Setup

### 1. Get Unsplash API Key (Optional)

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create an account and register your application
3. Get your API access key
4. Add it to your `.env.local` file:

```env
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

**Note**: The integration works without an API key using fallback images from Picsum Photos.

## Usage

### Basic Usage

```tsx
import { useRandomUnsplashImage } from '@/hooks/use-unsplash-images';
import { UnsplashImageWithHook } from '@/components/ui/unsplash-image';

function MyComponent() {
  return (
    <UnsplashImageWithHook
      query="gym fitness"
      alt="Gym motivation"
      width={400}
      height={300}
      showAttribution={true}
    />
  );
}
```

### Using Predefined Categories

```tsx
import { useCategoryImages } from '@/hooks/use-unsplash-images';
import { UnsplashImageGrid } from '@/components/ui/unsplash-image';

function MyComponent() {
  const { images, loading } = useCategoryImages('GYM', 6);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UnsplashImageGrid
      images={images}
      columns={3}
      gap={4}
      showAttribution={true}
    />
  );
}
```

### Available Categories

```tsx
import { IMAGE_CATEGORIES } from '@/lib/unsplash';

// Available categories:
IMAGE_CATEGORIES.GYM              // "gym fitness workout"
IMAGE_CATEGORIES.WEIGHT_LIFTING   // "weight lifting strength training"
IMAGE_CATEGORIES.CARDIO           // "cardio exercise running"
IMAGE_CATEGORIES.BODYBUILDING     // "bodybuilding muscle fitness"
IMAGE_CATEGORIES.YOGA             // "yoga meditation wellness"
IMAGE_CATEGORIES.PERSONAL_TRAINING // "personal trainer fitness"
IMAGE_CATEGORIES.EQUIPMENT        // "gym equipment weights"
IMAGE_CATEGORIES.NUTRITION        // "healthy food nutrition"
```

### Custom Queries

```tsx
import { useUnsplashImages } from '@/hooks/use-unsplash-images';

function MyComponent() {
  const { images, loading, error } = useUnsplashImages('crossfit workout', 10);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {images.map(image => (
        <img key={image.id} src={image.urls.regular} alt={image.alt_description} />
      ))}
    </div>
  );
}
```

## Components

### UnsplashImageWithHook

A component that fetches and displays a single random image.

```tsx
<UnsplashImageWithHook
  query="weight lifting"
  alt="Weight lifting motivation"
  width={400}
  height={300}
  priority={false}
  showAttribution={true}
  fallbackSrc="/fallback-image.jpg"
/>
```

### UnsplashImageComponent

A component that displays a specific Unsplash image.

```tsx
<UnsplashImageComponent
  image={unsplashImage}
  alt="Custom alt text"
  width={400}
  height={300}
  priority={false}
  showAttribution={true}
  attributionClassName="custom-attribution-class"
/>
```

### UnsplashImageGrid

A component that displays multiple images in a grid.

```tsx
<UnsplashImageGrid
  images={unsplashImages}
  columns={3}
  gap={4}
  className="custom-grid-class"
  showAttribution={true}
/>
```

## Hooks

### useUnsplashImages

Fetch multiple images by query.

```tsx
const { images, loading, error } = useUnsplashImages('gym', 10);
```

### useRandomUnsplashImage

Fetch a single random image by query.

```tsx
const { image, loading, error } = useRandomUnsplashImage('fitness');
```

### useCategoryImages

Fetch multiple images using predefined categories.

```tsx
const { images, loading, error } = useCategoryImages('GYM', 6);
```

### useRandomCategoryImage

Fetch a single random image using predefined categories.

```tsx
const { image, loading, error } = useRandomCategoryImage('WEIGHT_LIFTING');
```

## API Reference

### UnsplashImage Interface

```tsx
interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}
```

### Functions

#### getUnsplashImages(query: string, count: number = 10)

Fetches multiple images from Unsplash or returns fallback images.

#### getRandomUnsplashImage(query: string)

Fetches a single random image from Unsplash or returns a fallback image.

## Examples

See `frontend/components/examples/UnsplashExample.tsx` for comprehensive usage examples.

## Best Practices

1. **Always provide alt text** for accessibility
2. **Use appropriate image sizes** to optimize performance
3. **Show attribution** when using Unsplash images (required by their terms)
4. **Handle loading states** to improve user experience
5. **Provide fallback images** for better reliability
6. **Use predefined categories** when possible for consistency

## Troubleshooting

### Images not loading

1. Check if your Unsplash API key is valid
2. Verify your API key is in the `.env.local` file
3. Check the browser console for errors
4. The integration will fall back to Picsum Photos if Unsplash fails

### Rate limiting

Unsplash has rate limits:
- 50 requests per hour for demo applications
- 5000 requests per hour for production applications

The integration handles rate limiting gracefully by falling back to Picsum Photos.

### Attribution requirements

When using Unsplash images, you must:
1. Show photographer attribution
2. Link to the photographer's Unsplash profile
3. Link to Unsplash

The components handle this automatically when `showAttribution={true}`. 