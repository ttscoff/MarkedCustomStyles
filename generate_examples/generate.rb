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
  metadata = {}
  options = ""
  files = Dir.glob('../*.css').sort
  subfiles = Dir.glob('../*/*.css').sort
  files.concat(subfiles)
  files.each do |f|
    # style = File.basename(f,".css")
    next if File.basename(File.dirname(f)) == File.basename(Dir.pwd)
    next if File.basename(f) == "Header.css"
    style = f.sub(/\.\.\/(.*?)\.css/,'\1')
    metadata[style] =  get_meta(f)
    options += %Q{\t\t<option value="#{style}">#{style}</option>\n}
  end

  [options, metadata]
end

template = IO.read('template.html')
options, metadata = generate_options
File.open('styles.html','w') do |f|
  output = template.sub(/%%metadata%%/, metadata.to_json)
  output.sub!(/%%stylemenu%%/,options)
  f.puts output
end
