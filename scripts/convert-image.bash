source_dir="/Users/vedanta/Downloads/products-webp"
output_dir="/Users/vedanta/Downloads/products-jpg"

mkdir -p "$output_dir"

find "$source_dir" -type f -iname '*.webp' -print0 |
while IFS= read -r -d '' file; do
  relative="${file#"$source_dir"/}"
  stem="${relative%.*}"

  if [[ "$stem" == *-v2 ]]; then
    stem="${stem%-v2}-v3"
  fi

  output="$output_dir/$stem.jpg"

  mkdir -p "$(dirname "$output")"

  magick "$file" \
    -auto-orient \
    -resize "x900>" \
    -strip \
    -colorspace sRGB \
    -quality 95 \
    "$output"

  echo "Created: $output"
done

echo "Conversion complete."