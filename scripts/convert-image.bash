source_dir="/Users/vedanta/Documents/loomyna-assets/jpeg"
output_dir="/Users/vedanta/Documents/loomyna-assets/webp"

mkdir -p "$output_dir"

find "$source_dir" -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) -print0 |
while IFS= read -r -d '' file; do
  relative="${file#$source_dir/}"
  output="$output_dir/${relative%.*}.webp"

  mkdir -p "$(dirname "$output")"

  magick "$file" \
    -auto-orient \
    -resize "x2000>" \
    -strip \
    -colorspace sRGB \
    -quality 90 \
    "$output"

  echo "Created: $output"
done

echo "Conversion complete."