json.data(@data) { |d| json.extract!(d, :id, :title, :estimated_time, :actual_time, :completed) }
