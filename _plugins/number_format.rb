module Jekyll
  module NumberFormatFilter
	def number_format(input)
	  formatted_number = input.to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1,').reverse
	  formatted_number.sub(/(\.00|\.0)$/, '')
	end
  end
end

Liquid::Template.register_filter(Jekyll::NumberFormatFilter)
