using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading.Tasks;
using StackExchange.Redis;

namespace Spectrum.Data.Core.Caching.Extensions
{
    public static class RedisCacheExtensions
    {
        public static T Get<T>(this IDatabase cache, string key)
        {
            return Deserialize<T>(cache.StringGet(key));
        }

        //public static object Get(this IDatabase cache, string key)
        //{
        //    return Deserialize<object>(cache.StringGet(key));
        //}

        public async static Task<T> GetAsync<T>(this IDatabase cache, string key)
        {
            return Deserialize<T>(await cache.StringGetAsync(key));
        }

        //public async static Task<object> GetAsync(this IDatabase cache, string key)
        //{
        //    return Deserialize<object>(await cache.StringGetAsync(key));
        //}

        public static void Set(this IDatabase cache, string key, object value)
        {
            cache.StringSet(key, Serialize(value));
        }

        static byte[] Serialize(object o)
        {
            if (o == null)
            {
                return null;
            }

            BinaryFormatter binaryFormatter = new BinaryFormatter();
            using (MemoryStream memoryStream = new MemoryStream())
            {
                binaryFormatter.Serialize(memoryStream, o);
                byte[] objectDataAsStream = memoryStream.ToArray();
                return objectDataAsStream;
            }
        }

        static T Deserialize<T>(byte[] stream)
        {
            if (stream == null)
            {
                return default(T);
            }

            BinaryFormatter binaryFormatter = new BinaryFormatter();
            using (MemoryStream memoryStream = new MemoryStream(stream))
            {
                T result = (T)binaryFormatter.Deserialize(memoryStream);
                return result;
            }
        }
    }
}