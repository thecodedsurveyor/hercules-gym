'use client';

import { useCategoryImages, useRandomCategoryImage } from '@/hooks/use-unsplash-images';
import { UnsplashImageComponent, UnsplashImageGrid, UnsplashImageWithHook } from '@/components/ui/unsplash-image';

export default function UnsplashExample() {
  const { images: gymImages, loading: gymLoading } = useCategoryImages('GYM', 6);
  const { image: randomImage, loading: randomLoading } = useRandomCategoryImage('WEIGHT_LIFTING');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Unsplash Integration Examples</h1>
      
      {/* Single Random Image */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Single Random Image</h2>
        <div className="max-w-md">
          <UnsplashImageWithHook
            query="weight lifting"
            alt="Weight lifting motivation"
            width={400}
            height={300}
            showAttribution={true}
          />
        </div>
      </section>

      {/* Image Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Image Grid</h2>
        {gymLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-700 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : (
          <UnsplashImageGrid
            images={gymImages}
            columns={3}
            gap={4}
            showAttribution={true}
          />
        )}
      </section>

      {/* Individual Images */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Individual Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gymImages.slice(0, 3).map((image) => (
            <div key={image.id} className="space-y-4">
              <UnsplashImageComponent
                image={image}
                alt={image.alt_description}
                showAttribution={true}
              />
              <p className="text-gray-300 text-sm">{image.alt_description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Different Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Different Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Cardio</h3>
            <UnsplashImageWithHook
              query="cardio exercise"
              alt="Cardio workout"
              width={300}
              height={200}
              showAttribution={false}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Bodybuilding</h3>
            <UnsplashImageWithHook
              query="bodybuilding"
              alt="Bodybuilding"
              width={300}
              height={200}
              showAttribution={false}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Equipment</h3>
            <UnsplashImageWithHook
              query="gym equipment"
              alt="Gym equipment"
              width={300}
              height={200}
              showAttribution={false}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Nutrition</h3>
            <UnsplashImageWithHook
              query="healthy food"
              alt="Healthy nutrition"
              width={300}
              height={200}
              showAttribution={false}
            />
          </div>
        </div>
      </section>
    </div>
  );
} 