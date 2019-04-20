#!/usr/bin/env ruby

def generate_options
  options = ""
  files = Dir.glob('../*.css')
  files.concat(Dir.glob('../*/*.css'))
  files.each do |f|
    # style = File.basename(f,".css")
    next if File.basename(File.dirname(f)) == File.basename(Dir.pwd)
    style = f.sub(/\.\.\/(.*?)\.css/,'\1')
    options += %Q{\t\t<option value="#{style}">#{style}</option>\n}
  end
  options
end

template = IO.read('template.html')
File.open('styles.html','w') do |f|
  f.puts template.sub(/%%stylemenu%%/,generate_options)
end
