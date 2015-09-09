json.data(@tasks) { |d| json.extract!(d, :id, :title, :estimated_time, :actual_time, :completed) }
