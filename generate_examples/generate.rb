#!/usr/bin/env ruby

def generate_options
  options = ""
  Dir.glob('../*.css').each do |f|
    style = File.basename(f,".css")
    options += %Q{\t\t<option value="#{style}">#{style}</option>\n}
  end
  options
end

template = IO.read('template.html')
File.open('styles.html','w') do |f|
  f.puts template.sub(/%%stylemenu%%/,generate_options)
end
