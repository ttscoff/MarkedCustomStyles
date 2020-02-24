#!/usr/bin/env ruby
require 'json'

def get_meta(file)
  content = IO.read(file)
  data = {
    'title' => '',
    'author' => '',
    'description' => ''
  }
  title = content.match(/^\s*Title:(.*?)$/i)
  if (title)
    data['title'] = title[1].strip
  end

  author = content.match(/^\s*Author:(.*?)$/i)
  if (author)
    data['author'] = author[1].strip
  end

  description = content.match(/^\s*Description:(.*?)$/i)
  if (description)
    data['description'] = description[1].strip
  end

  data
end

def generate_options
  meta = {}
  options = []
  previews = []
  files = Dir.glob('../*.css')
  # files.concat(Dir.glob('../*/*.css'))
  files.each do |f|
    # style = File.basename(f,".css")
    next if File.basename(File.dirname(f)) == File.basename(Dir.pwd) || File.basename(f) == "Header.css"
    style = File.basename(f,".css")
    meta = get_meta(f)
    metadata[style] = meta
    options.push(%Q{<option value="#{style}">#{style}</option>})
    if File.exists?("../previews/#{style}.png")
      preview = %Q{<li class="preview">}
      preview += %Q{<a href="preview.html##{style}"><figure>}
      preview += %Q{<img src="../previews/#{style}.png">}
      preview += %Q{<figcaption><p class="byline"><span class="title">#{meta['title']}</span> <span class="author">by #{meta['author']}</span></p>}
      preview += %Q{<p class="description">#{meta['description']}</p>}
      preview += %Q{</figcaption></figure></a></li>}
      previews.push(preview)
    end
  end
  {
    :stylemenu => options.join("\n"),
    :previews => previews.join("\n"),
    :meta => meta
  }
end

styles = generate_options

template = IO.read('template.html')

File.open('preview.html', 'w') do |f|
  output = template.sub(/%%metadata%%/, styles[:meta].to_json)
  output.sub!(/%%stylemenu%%/, styles[:stylemenu])
  f.puts output
end

template = IO.read('preview_template.html')

File.open('styles.html', 'w') do |f|
  f.puts template.sub(/%%stylemenu%%/, styles[:stylemenu]).sub(/%%previews%%/, styles[:previews])
end

