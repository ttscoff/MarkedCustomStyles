#!/usr/bin/env ruby
require 'json'
require 'fileutils'

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
  metadata = {}
  options = []
  previews = []
  ignored_styles = ["Header.css", "Custom.css"]
  files = Dir.glob('../*.css').sort_by(&:downcase)
  # files.concat(Dir.glob('../*/*.css'))
  files.each do |f|
    # style = File.basename(f,".css")
    next if File.basename(File.dirname(f)) == File.basename(Dir.pwd) || ignored_styles.include?(File.basename(f))
    Dir.mkdir("styles") unless File.directory?("styles")
    FileUtils.cp(f, "styles")
    style = File.basename(f,".css")
    meta = get_meta(f)
    metadata[style] = meta
    options.push(%Q{<option value="#{style}">#{style}</option>})
    if File.exists?("previews/#{style.gsub(/ /,'')}.png")
      preview = %Q{<li class="preview">}
      preview += %Q{<a href="preview##{style}">}
      preview += %Q{<figure><h3>#{meta['title']}</h3>}
      preview += %Q{<img src="previews/#{style.gsub(/ /,'')}.png">}
      preview += %Q{<figcaption><p class="byline">by #{meta['author']}</p>}
      preview += %Q{<p class="description">#{meta['description']}</p>}
      preview += %Q{</figcaption></figure></a></li>}
      previews.push(preview)
    end
  end
  {
    :stylemenu => options.join("\n"),
    :previews => previews.join("\n"),
    :meta => metadata
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

File.open('index.html', 'w') do |f|
  f.puts template.sub(/%%stylemenu%%/, styles[:stylemenu]).sub(/%%previews%%/, styles[:previews])
end

