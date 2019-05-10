#!/usr/bin/env ruby

def generate_options
  options = ""
  files = Dir.glob('../*.css').sort
  subfiles = Dir.glob('../*/*.css').sort
  files.concat(subfiles)
  files.each do |f|
    # style = File.basename(f,".css")
    next if File.basename(File.dirname(f)) == File.basename(Dir.pwd)
    next if File.basename(f) == "Header.css"
    style = f.sub(/\.\.\/(.*?)\.css/,'\1')
    options += %Q{\t\t<option value="#{style}">#{style}</option>\n}
  end
  options
end

template = IO.read('template.html')
File.open('styles.html','w') do |f|
  f.puts template.sub(/%%stylemenu%%/,generate_options)
end
